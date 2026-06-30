import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-margin-mobile text-center">
      <div className="bg-error-container/30 w-24 h-24 rounded-full flex items-center justify-center mb-8">
        <AlertCircle className="w-12 h-12 text-error" />
      </div>
      <h2 className="font-display-lg text-primary mb-4">404 - Page Not Found</h2>
      <p className="font-body-lg text-on-surface-variant max-w-md mb-8">
        Oops! We couldn't find the page you were looking for. It might have been moved or doesn't exist.
      </p>
      <Link 
        href="/"
        className="bg-primary text-white font-label-md px-8 py-3 rounded-full hover:bg-primary/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}
