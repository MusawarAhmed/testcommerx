
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="flex space-x-4">
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
        </nav>
    );
}
