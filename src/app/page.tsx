"use client";

import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const GET_USER = gql`
    query {
        viewer {
            login
            name
            bio
            avatarUrl
            url
            location
            followers(first: 100) {
                totalCount
                nodes {
                    login
                    name
                    url
                    avatarUrl
                }
            }
            following {
                totalCount
            }
            repositories(first: 100) {
                totalCount
                nodes {
                    name
                    url
                    description
                    languages(first: 10) {
                        totalCount
                        edges {
                            size
                            node {
                                name
                                color
                            }
                        }
                    }
                }
            }
            starredRepositories {
                totalCount
            }
        }
    }
`;

export default function Home() {
    const { loading, error, data } = useQuery(GET_USER);

    if (loading) return (
        <div className="w-full h-full grid place-items-center">
            <div className="loader"></div>
        </div>
    );
    if (error) return <p>Error: {error.message}</p>;
    
    const repos = data.viewer.repositories.nodes;
    console.log(repos);

    // console.log(data);
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex flex-col gap-4"
        >
            <div className="pl-10 pt-10 flex gap-4">
                <img
                    className="rounded-full w-24 h-24"
                    src={data.viewer.avatarUrl}
                    alt={data.viewer.name}
                />
                <div>
                    <h1 className="text-4xl font-semibold">
                        Hello, {data.viewer.name}
                    </h1>
                    <div>
                        visit your profile <a href={data.viewer.url} className="underline underline-offset-2">here</a>
                    </div>
                </div>
            </div>

            <div className="pl-8 w-full flex mt-4 grid grid-cols-[3fr_10fr] gap-8">
                <div className="ml-4 flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">
                        Your followers
                    </h1>
                    {data.viewer.followers.nodes.map((follower: any) => (
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
                                    <a href={follower.url} className="underline underline-offset-2">{follower.login}</a>
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">
                        Your repositories
                    </h1>
                    {repos.map((repo: any) => (
                        <div key={repo.name} className="flex flex-col gap-2 w-[90%]">
                            <h1 className="text-xl font-semibold">
                                {repo.name}
                            </h1>
                            <small>
                                {repo.description}
                            </small>
                            <div className="flex gap-3">
                                {repo.languages.edges.map((lang: any) => (
                                    <div key={lang.node.name} className="flex items-center gap-1">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: lang.node.color }}
                                        ></div>
                                        <small>{lang.node.name}</small>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full bg-white h-[1px] mt-2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}