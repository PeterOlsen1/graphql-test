'use client';

import { useParams } from 'next/navigation';
import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import LanguageDisplay from "../components/LanguageDisplay";
import { useEffect } from 'react';
import { GET_USER } from '@/lib/queries';


export default function User() {
    const params = useParams();
    const router = useRouter();
    const { user } = params;

    const { loading, error, data } = useQuery(GET_USER(user as string));

    useEffect(() => {
        if (error) {
            router.push('/error/userNotFound');
        }
    }, [error, router]);

    if (loading || error || !data) {
        return (
            <div className="w-full h-screen grid place-items-center">
                <div className="loader"></div>
            </div>
        );
    }

    const id = data.user.id;
    let repos = [...data.user.repositories.nodes].reverse();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex flex-col gap-4 overflow-x-hidden"
        >
            <div className="pl-10 pt-10 flex gap-4">
                <img
                    className="rounded-full w-24 h-24"
                    src={data.user.avatarUrl}
                    alt={data.user.name}
                />
                <div>
                    <h1 className="text-4xl font-semibold">
                        {data.user.name}
                    </h1>
                    <div>
                        visit {data.user.login}'s github profile <a href={data.user.url} className="underline underline-offset-2">here</a>
                    </div>
                </div>
            </div>

            <div className="pl-8 w-full mt-4 grid grid-cols-[3fr_10fr] gap-8 overflow-x-hidden">
                <div className="ml-4 flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">
                        Followers
                    </h1>
                    {data.user.followers.nodes.map((follower: any) => (
                        <div key={follower.login} className="flex gap-4 bg-zinc-800 p-2 rounded-xl">
                            <img
                                className="rounded-full w-12 h-12"
                                src={follower.avatarUrl}
                                alt={follower.name}
                            />
                            <div>
                                <h1 className="font-semibold">
                                    {follower.name}
                                </h1>
                                <small>                                    
                                    <a href={`/${follower.login}`} className="underline underline-offset-2">{follower.login}</a>
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">
                        Repositories
                    </h1>
                    {repos.map((repo: any) => 
                    repo.owner.id == id && (
                        <div key={repo.name} className="flex flex-col gap-2 w-[90%]">
                            <h1 className="text-xl font-semibold cursor-pointer" onClick={() => router.push(`/${user}/${repo.name}`)}>
                                {repo.name}
                            </h1>
                            <small>
                                {repo.description}
                            </small>
                            <LanguageDisplay langs={repo.languages.edges} />
                            <div className="flex gap-3">
                                {repo.languages.edges.map((lang: any) => 
                                    <div key={lang.node.name} className="flex items-center gap-1">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: lang.node.color }}
                                        ></div>
                                        <small>{lang.node.name}</small>
                                    </div>
                                )}
                            </div>
                            <div className="w-full bg-white h-[1px] mt-2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}