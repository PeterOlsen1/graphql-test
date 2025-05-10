"use client";

import { useParams } from 'next/navigation';
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { GET_REPO } from '@/lib/queries';


export default function Page() {
    const params = useParams();
    const router = useRouter();
    const { user, repo } = params;

    const { loading, error, data } = useQuery(GET_REPO(user as string, repo as string));
    
    if (loading || error || !data) {
        return (
            <div className="w-full h-screen grid place-items-center">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div>
            repo: {repo}
            <br />
            user: {user}
        </div>
    );
}