
import Link from 'next/link';
import { Blog } from '../../_lib/types';

interface BlogCardProps {
    blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            <Link href={`/blog/${blog.slug}`} className="text-blue-500 hover:underline">
                Read more &rarr;
            </Link>
        </div>
    );
}
