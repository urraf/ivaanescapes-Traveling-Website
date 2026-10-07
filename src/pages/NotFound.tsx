import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Img } from '../components/ui'

export default function NotFound() {
  return (
    <section className="grain relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-navy px-4 text-center text-ivory">
      <Img id="photo-1606857090627-27ca46667290" alt="" sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
      <div>
        <p className="text-gilded font-cinzel text-8xl font-bold sm:text-9xl">404</p>
        <p className="mt-2 font-script text-4xl text-gold-soft">Looks like you've wandered off the map</p>
        <p className="mx-auto mt-4 max-w-md text-ivory/70">The page you're looking for doesn't exist — but plenty of extraordinary places do.</p>
        <Link to="/packages" className="btn-gold mt-8">
          <Compass className="h-4 w-4" /> Find your way
        </Link>
      </div>
    </section>
  )
}
