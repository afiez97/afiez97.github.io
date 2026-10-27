/**
 * portrait-particles.js — "dots of ilmu" portrait effect
 *
 * The hero portrait dissolves into a spinning globe of particles and
 * reassembles into the photo — every particle is one pixel of the image.
 * Press & hold the portrait to scatter it again; the photo switch morphs
 * the particles between the two photos.
 *
 * Built with Motion (motion.dev) + three.js TSL, adapted from Motion's
 * "js-three-tsl" example. WebGPURenderer falls back to WebGL2 automatically.
 * site.js only loads this module when motion is allowed; if anything fails
 * the normal <img> portrait simply stays as it is.
 */
import { animate, motionValue, press, frame } from 'motion'
import { threeEffect } from 'motion/three'
import * as THREE from 'three/webgpu'
import { attribute, cos, mix, positionLocal, sin, time, uniform, vec3 } from 'three/tsl'

const PHOTOS = ['assets/img/work/afiez-portrait.jpg', 'assets/img/work/afiez-casual.webp']

const SPRING_ASSEMBLE = { type: 'spring', stiffness: 55, damping: 16, mass: 1 }
const SPRING_SCATTER = { type: 'spring', stiffness: 120, damping: 18, mass: 0.9 }

/** Photo is only shown once the particles have (almost) fully settled. */
function photoOpacity(globeAmount) {
   const t = Math.min(1, Math.max(0, (Math.max(globeAmount, 0) - 0.005) / 0.03))
   return 1 - t * t * (3 - 2 * t)
}

function samplePhoto(url, size) {
   return new Promise((resolve, reject) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
         const c = document.createElement('canvas')
         c.width = c.height = size
         const ctx = c.getContext('2d', { willReadFrequently: true })
         // cover-fit the photo into a square, like object-fit: cover
         const s = Math.min(img.naturalWidth, img.naturalHeight)
         ctx.drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 2, s, s, 0, 0, size, size)
         resolve(ctx.getImageData(0, 0, size, size).data)
      }
      img.onerror = () => reject(new Error('Could not load ' + url))
      img.src = url
   })
}

function toColours(pixels, cols) {
   const out = new Float32Array(cols * cols * 3)
   const c = new THREE.Color()
   for (let i = 0; i < cols * cols; i++) {
      const p = i * 4
      c.setRGB(pixels[p] / 255, pixels[p + 1] / 255, pixels[p + 2] / 255, THREE.SRGBColorSpace)
      out[i * 3] = c.r; out[i * 3 + 1] = c.g; out[i * 3 + 2] = c.b
   }
   return out
}

export async function mountPortraitParticles({ portrait, photos, startAlt = false }) {
   const width = Math.max(portrait.clientWidth, 1)
   const cols = Math.round(Math.min(140, Math.max(56, width / 3)))
   const count = cols * cols

   const [pixelsA, pixelsB] = await Promise.all(PHOTOS.map((u) => samplePhoto(u, cols)))

   const canvas = document.createElement('canvas')
   canvas.className = 'portrait-canvas'
   canvas.setAttribute('aria-hidden', 'true')
   portrait.insertBefore(canvas, portrait.firstChild)

   const renderer = new THREE.WebGPURenderer({ canvas, antialias: true, alpha: true })
   await renderer.init()
   renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
   renderer.setClearColor(0x000000, 0)
   renderer.outputColorSpace = THREE.SRGBColorSpace

   // ── attributes: grid (photo) position, globe position, two colour sets
   const gridPos = new Float32Array(count * 3)
   const globePos = new Float32Array(count * 3)
   const phases = new Float32Array(count)
   const speeds = new Float32Array(count)
   const yaw = Math.random() * Math.PI * 2
   const tilt = -0.28
   const R = 0.72

   for (let i = 0; i < count; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      gridPos[i * 3] = ((col + 0.5) / cols - 0.5) * 2
      gridPos[i * 3 + 1] = (0.5 - (row + 0.5) / cols) * 2

      // Fibonacci sphere
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const a = i * 2.39996323 + yaw
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      globePos[i * 3] = x * R
      globePos[i * 3 + 1] = (y * Math.cos(tilt) - z * Math.sin(tilt)) * R
      globePos[i * 3 + 2] = (y * Math.sin(tilt) + z * Math.cos(tilt)) * R

      phases[i] = Math.random() * Math.PI * 2
      speeds[i] = 0.7 + Math.random() * 0.35
   }

   const geometry = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(1, 1))
   geometry.instanceCount = count
   geometry.setAttribute('gridPos', new THREE.InstancedBufferAttribute(gridPos, 3))
   geometry.setAttribute('globePos', new THREE.InstancedBufferAttribute(globePos, 3))
   geometry.setAttribute('colourA', new THREE.InstancedBufferAttribute(toColours(pixelsA, cols), 3))
   geometry.setAttribute('colourB', new THREE.InstancedBufferAttribute(toColours(pixelsB, cols), 3))
   geometry.setAttribute('phase', new THREE.InstancedBufferAttribute(phases, 1))
   geometry.setAttribute('speed', new THREE.InstancedBufferAttribute(speeds, 1))

   // ── TSL material: one uniform morphs grid ↔ spinning globe, one swaps photos
   const globe = uniform(0)
   const photoMix = uniform(startAlt ? 1 : 0)
   const phase = attribute('phase')
   const speed = attribute('speed')
   const g = attribute('globePos')

   const spin = time.mul(0.35)
   const spun = vec3(
      g.x.mul(cos(spin)).add(g.z.mul(sin(spin))),
      g.y,
      g.z.mul(cos(spin)).sub(g.x.mul(sin(spin)))
   )
   const jitter = vec3(
      sin(time.mul(speed.add(0.6)).add(phase)).mul(0.03),
      cos(time.mul(speed.add(0.37)).add(phase.mul(1.71))).mul(0.025),
      sin(time.mul(speed.add(0.22)).add(phase.mul(2.13))).mul(0.03)
   )
   const cell = 2 / cols
   const size = mix(cell * 1.02, cell * 0.62, globe)

   const material = new THREE.MeshBasicNodeMaterial({ toneMapped: false })
   material.colorNode = mix(attribute('colourA'), attribute('colourB'), photoMix)
   material.positionNode = mix(attribute('gridPos'), spun.add(jitter), globe)
      .add(vec3(positionLocal.xy.mul(size), 0))

   const scene = new THREE.Scene()
   scene.add(new THREE.Mesh(geometry, material))
   const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
   camera.position.z = 4

   const resize = () => {
      const w = Math.max(portrait.clientWidth, 1)
      renderer.setSize(w, w, false)
   }
   new ResizeObserver(resize).observe(portrait)
   resize()

   // ── Motion values drive the uniforms (and the real <img> fade)
   const globeValue = motionValue(0)
   const photoValue = motionValue(startAlt ? 1 : 0)
   threeEffect(globe, { value: globeValue })
   threeEffect(photoMix, { value: photoValue })

   globeValue.on('change', (v) => {
      photos.style.opacity = String(photoOpacity(v))
      portrait.classList.toggle('is-scattered', v > 0.02)
   })

   frame.render(() => renderer.render(scene, camera), true)
   portrait.classList.add('has-particles')

   // Intro: photo → globe → photo, once the portrait is on screen
   let introDone = false
   const intro = () => {
      if (introDone) return
      introDone = true
      animate(globeValue, 1, { ...SPRING_SCATTER, delay: 0.4 })
      setTimeout(() => animate(globeValue, 0, SPRING_ASSEMBLE), 2000)
   }
   const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { intro(); io.disconnect() }
   }, { threshold: 0.5 })
   io.observe(portrait)

   // Press & hold to scatter into a globe, release to reassemble
   press(portrait, (_el, event) => {
      if (event && event.target.closest('.portrait-swap')) return
      animate(globeValue, 1, SPRING_SCATTER)
      return () => animate(globeValue, 0, SPRING_ASSEMBLE)
   })

   return {
      /** Morph to the other photo: scatter, swap colours mid-flight, reassemble. */
      swap(toAlt) {
         animate(photoValue, toAlt ? 1 : 0, { duration: 0.5, delay: 0.15, ease: 'easeInOut' })
         animate(globeValue, 1, SPRING_SCATTER)
         setTimeout(() => animate(globeValue, 0, SPRING_ASSEMBLE), 700)
      }
   }
}
