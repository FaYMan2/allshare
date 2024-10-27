/** @format */

"use client";

import { Anchor, ArrowDown, ExternalLink, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MyUploadDropzone from "./components/MyUploadDropzone";
import LinkDisplay from "./components/LinkDisplay";

export default function Home() {
	const [isUploaded, setUploaded] = useState<boolean>(false);
	const [shortenedLink, setShortenedLink] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleUploadComplete = async (originalLink: string) => {
		setLoading(true); // Start loading before API call

		try {
			const response = await fetch("/api/linkShortner", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url: originalLink }),
			});

			const data = await response.json();
			if (response.ok) {
				setShortenedLink(data.shortenedUrl);
				setUploaded(true);
			} else {
				console.error("Failed to shorten URL:", data);
				alert("URL shortening failed. Please try again.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while shortening the URL.");
		} finally {
			setLoading(false);
		}
	};
	return (
		<main className="container flex max-w-screen-md flex-col items-center px-5">
			<section className="space-y-6 pb-[6rem] pt-8 lg:py-[5rem]">
				<div className="flex w-full max-w-[64rem] flex-col items-center gap-4 text-center">
					<Link
						href="https://github.com/FaYMan2/"
						className="rounded-2xl border bg-background px-4 py-1.5 text-xs font-medium"
						target="_blank">
						@suvarn&apos;s github
					</Link>

					<h1 className="font-heading max-w-md text-5xl sm:text-4xl group">
						Sharewave{" "}
						<span className="inline-block text-green-400 transform transition-transform duration-500 group-hover:rotate-45 rotate-0">
							✧
						</span>
					</h1>

					<h1 className="font-heading max-w-md text-3xl sm:text-4xl">
						<span className="font-mono font-semibold">
							{process.env.NEXT_PUBLIC_APP_URL?.split("://")[1]}
						</span>{" "}
						a self hostable open source{" "}
						<span className="underline decoration-wavy decoration-green-400">
							File uploader
						</span>
					</h1>

					{!isUploaded ? (
						<MyUploadDropzone
							setUploadedLink={handleUploadComplete}
						/>
					) : loading ? (
						<div className="flex items-center justify-center mt-8">
							<div className="loader border-t-4 border-white border-solid rounded-full w-12 h-12 animate-spin"></div>
							<p className="ml-4">Shortening file...</p>
						</div>
					) : (
						shortenedLink && <LinkDisplay link={shortenedLink} />
					)}

					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl pt-2 sm:leading-8">
						{process.env.NEXT_PUBLIC_APP_URL?.split("://")[1]} self
						hostable, feature rich, minimalistic and open source
						File shortener <br /> built with Next.js and Postgres.
					</p>

					<p className="text-xs">
						Try now or{" "}
						<span className="font-semibold">self host</span> (check
						GitHub for more information)
					</p>

					<div className="mt-3 flex space-x-4">
						<Link
							href="/x"
							className="flex h-10 items-center rounded-md bg-blue-500 px-8 text-sm text-white">
							Login
						</Link>
						<Link
							href="https://github.com/FaYMan2/allshare"
							target="_blank"
							rel="noreferrer"
							className="relative flex h-10 items-center gap-2 rounded-md border bg-background px-8 text-sm">
							<p>Github</p>
							<div className="absolute -top-4 right-2.5 flex items-center gap-1 rounded-md bg-foreground px-2 text-black bg-white">
								<Star className="h-3 w-3" />
								<p className="pt-0.3 font-mono text-[0.8rem] font-bold">
									2
								</p>
							</div>
						</Link>
					</div>
				</div>
			</section>

			{/* 
        // ~ Some stats
      */}
			<div className="mb-15 grid grid-cols-2 gap-4 text-black">
				<h3 className="col-span-2 flex items-center justify-center text-xl font-medium text-blue-500">
					<ArrowDown className="text-blue-200" />
					<span className="ml-1 text-blue-500">Some Stats</span>
					<ArrowDown className="text-blue-300" />
				</h3>

				<div className="flex flex-col items-center space-y-1 rounded-md border-2 border-green-400 bg-green-100 px-8 py-3">
					<User className="h-8 w-8 text-green-600" />
					<p className="text-xs">Users</p>
					<p>12</p>
				</div>
				<div className="flex flex-col items-center space-y-1 rounded-md border-2 border-blue-400 bg-blue-100 px-8 py-3">
					<Anchor className="h-8 w-8 text-blue-600" />
					<p className="text-xs">Short Links</p>
					<p>20</p>
				</div>
			</div>

			<section
				id="open-source"
				className="container mt-16 py-8 md:py-8 lg:py-15">
				<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
					<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl">
						Proudly Open Source
					</h2>
					<p className="max-w-[85%] text-xs leading-normal text-muted-foreground">
						Sharewave is open source and powered by open source
						software.
						<br />
						The source code is available on{" "}
						<Link
							href="https://github.com/FaYMan2/allshare"
							target="_blank"
							rel="noreferrer"
							className="underline underline-offset-4">
							GitHub
						</Link>
						.
					</p>

					<div className="mt-4 flex gap-2">
						<Link href="https://vercel.com" target="_blank">
							<Image
								src="https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg"
								alt="Powered by Vercel"
								height={32}
								width={128}
							/>
						</Link>
					</div>

					<p className="text-xs">
						<Link href={"/public"}>12 </Link>
						public links today.
						<br />
						Report abuse at this{" "}
						<Link
							className="border-b border-foreground/50"
							href="mailto:22052517@kiit.ac.in">
							email
						</Link>
						.
					</p>
				</div>
			</section>
		</main>
	);
}
