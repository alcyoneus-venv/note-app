"use client"

import { useState } from "react"
import { CONTACT_EMAIL } from "@/lib/config"

const inputStyles = [
	"w-full px-4 py-2.5 rounded-xl bg-background border border-card-border",
	"text-foreground text-sm placeholder:text-grey focus:outline-none",
	"focus:border-sky-blue focus:ring-2 focus:ring-sky-blue/20 transition-all duration-200",
].join(" ")

export default function ContactForm() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target
		setForm((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const subject = encodeURIComponent(`Contact from ${form.name || "Website"}`)
		const body = encodeURIComponent(
			`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
		)
		window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-5"
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-dark-grey dark:text-off-white mb-1.5"
					>
						Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						value={form.name}
						onChange={handleChange}
						placeholder="Your name"
						className={inputStyles}
					/>
				</div>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-dark-grey dark:text-off-white mb-1.5"
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						value={form.email}
						onChange={handleChange}
						placeholder="you@example.com"
						className={inputStyles}
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="message"
					className="block text-sm font-medium text-dark-grey dark:text-off-white mb-1.5"
				>
					Message
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows={6}
					value={form.message}
					onChange={handleChange}
					placeholder="Write your message here..."
					className={`${inputStyles} resize-none`}
				/>
			</div>

			<button
				type="submit"
				className="btn-primary w-full py-3 rounded-xl text-sm font-semibold"
			>
				Send Email
			</button>

			<p className="text-xs text-grey text-center">
				This opens your email app with the message pre-filled, sent to{" "}
				{CONTACT_EMAIL}.
			</p>
		</form>
	)
}