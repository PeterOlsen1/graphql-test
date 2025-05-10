import { useRef } from "react";

export default function LanguageDisplay({ langs }: { langs: any}) {
    const langRef = useRef<HTMLDivElement>(null);
    const maxSize = langs.reduce((acc: number, lang: any) => {
        return acc + lang.size;
    }, 0);

    // add percentage of total size to each language
    langs = [...langs].map((lang: any) => ({
        ...lang,
        pct: lang.size / maxSize * 100,
    }));

    console.log(langs);
    return (
        <div ref={langRef} className="w-[60%] flex">
            {langs.map((lang: any, index: number) => {
                return (
                    <div key={index} className="h-2"
                    style={{
                        backgroundColor: lang.node.color,
                        width: `${lang.pct}%`,
                        borderTopLeftRadius: index === 0 ? "8px" : "0",
                        borderBottomLeftRadius: index === 0 ? "8px" : "0",
                        borderTopRightRadius: index === langs.length - 1 ? "8px" : "0",
                        borderBottomRightRadius: index === langs.length - 1 ? "8px" : "0",
                      }}></div>
                );
            })}
        </div>
    )
}