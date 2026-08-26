import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-7xl font-bold text-sky-blue mb-4">404</p>
        <h1 className="text-2xl font-bold text-dark-grey dark:text-off-white mb-3">
          Page Not Found
        </h1>
        <p className="text-grey-dark mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-primary inline-block px-6 py-3 rounded-lg text-sm font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
