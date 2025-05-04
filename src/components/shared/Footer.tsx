import Link from "next/link";

export const Footer = () => (
    <footer className="bg-gray-200 mt-16 py-8 text-sm text-center text-gray-700">
      <div className="container mx-auto space-y-4">
        <p>Contact: support@sustainhub.com | +880 1234-567890</p>
        <div className="space-x-4">
          <Link href="/terms" className="hover:underline">Terms of Use</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Sustainability Idea Hub. All rights reserved.</p>
      </div>
    </footer>
  );
  