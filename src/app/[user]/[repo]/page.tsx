"use client";

import { useParams } from 'next/navigation';
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { GET_REPO, GET_FILE } from '@/lib/queries';
import { Marked } from 'marked';


export default function Page() {
    const params = useParams();
    const router = useRouter();
    const { user, repo } = params;

    const { loading, error, data } = useQuery(GET_REPO(user as string, repo as string));
    const { loading: readmeLoading, error: readmeError, data: readmeData } = useQuery(GET_FILE(user as string, repo as string, "README.md"));
    
    if (loading || readmeLoading) {
        return (
            <div className="w-full h-screen grid place-items-center">
                <div className="loader"></div>
            </div>
        );
    }
    
    if (error || readmeError) {
        return (
            <div className="w-full h-screen grid place-items-center">
                <div className="text-2xl font-semibold">
                    {error && error.message}
                </div>  
            </div>
        )
    }
    
    // console.log(data);
    const repoData = data.repository;
    const files = repoData.object.entries;
    const repoEntryStyle = "flex gap-1 border border-[rgba(79,79,79,0.5)] p-1 text-center";
    const readmeText = readmeData.repository.object.text;
    const md = new Marked();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex flex-col gap-4 overflow-x-hidden"
        >
            <div className="w-full flex">
                <div className="pl-10 pt-10 flex gap-4">
                    <img
                        className="rounded-full w-16 h-16"
                        src={repoData.owner.avatarUrl}
                        alt={repoData.owner.login}
                    />
                    <div className="h-full text-4xl font-semibold text-center">
                        {repoData.name}
                    </div>
                </div>
            </div>

            {/* main body div */}
            <div className="w-full flex flex-col justify-center items-center overflow-hidden">
                <div className="w-[80%]">

                    {/* folders */}
                    <div className="w-full flex flex-col ">
                        {files.map((file: any, index: number) => {
                            if (file.type === "tree") {
                                return (
                                    <div key={index} className={repoEntryStyle}>
                                        <svg style={{ filter: "invert(0.6)"}} viewBox='0 0 30 30' className="w-10 h-10 grid relative top-[0.5em] left-[0.5em]">
                                            <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"></path>
                                        </svg>
                                        <div className="grid place-items-center">
                                            {file.name}
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (null)
                            }
                        })}
                    </div>
                    {/* files */}
                    <div className="w-full flex flex-col">
                        {files.map((file: any, index: number) => {
                            if (file.type === "blob") {
                                return (
                                    <div key={index} className={repoEntryStyle}>
                                        <svg style={{ filter: "invert(0.6)"}} viewBox='0 0 30 30' className="w-10 h-10 grid relative top-[0.5em] left-[0.5em]">
                                            <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"></path>
                                        </svg>
                                        <div className="grid place-items-center">
                                            {file.name}
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (null)
                            }
                        })}
                    </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: md.parse(readmeText) }} />
            </div>
        </motion.div>
    );
}