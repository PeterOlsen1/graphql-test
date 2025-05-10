"use client";

import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <div className="w-full h-screen grid place-items-center">
            <div className="text-2xl text-center">
                <h1 className="text-4xl font-bold">Uh oh! User not found!</h1>
                <p className="text-lg">Please check the username and try again.</p>
                <input type="text" 
                    className="mt-6 p-2 text-[0.8em] rounded border border-gray-300 w-full"
                    onKeyDown={(e) => {
                        console.log(e);
                        const input = e.target as HTMLInputElement;
                        const value = input.value;
                        if (e.nativeEvent.key === "Enter" && value) {
                            router.push(`/${value}`);
                        }
                    }} 
                />
            </div>
        </div>
    )
}