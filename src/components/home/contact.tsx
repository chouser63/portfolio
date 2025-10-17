"use client"

import { useState } from "react";

export default function Contact() {
    const [revealed, setRevealed] = useState(false);
    const phone = "(847) 284-5315";
    const email = "houser.ch@northeastern.edu"

    return (
        <div className="w-3/4 sm:w-1/2 space-y-4 text-xl">
            {/*<h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Contact
            </h1>*/}

            <div>
                {!revealed ? (
                    <button
                        className="inline-block px-3 py-1 border rounded bg-slate-700 text-white cursor-pointer hover:scale-105"
                        onClick={() => setRevealed(true)}
                    >
                        Show contact info
                    </button>
                ) : (
                    <div className="flex flex-col items-start justify-start text-slate-700">
                        <p>{email}</p>
                        <p>{phone}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
