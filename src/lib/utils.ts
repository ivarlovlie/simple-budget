import { goto } from "$app/navigation"

export async function preventDefaultAndNavigate(event: Event, href: string) {
    event.preventDefault()
    event.stopImmediatePropagation()
    await goto(href);
}