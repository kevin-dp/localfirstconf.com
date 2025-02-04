import {InstagramIcon} from '@/components/icons/instagram'
import {LinkedinIcon} from '@/components/icons/linkedin'
import {TwitterIcon} from '@/components/icons/twitter'
import {WhatsappIcon} from '@/components/icons/whatsapp'
import {cn} from '@/utils/cn'
import {EnvelopeIcon, GlobeAltIcon, LinkIcon} from '@heroicons/react/20/solid'
import {allAttendees, allSessions, allSpeakers} from 'contentlayer/generated'
import {addMinutes, format} from 'date-fns'
import {useMDXComponent} from 'next-contentlayer/hooks'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'

export default function AttendeePage({params: {slug}}: {params: {slug: string}}) {
  const attendee = allAttendees.find((attendee) => attendee.slug === slug)
  if (!attendee) notFound()

  const Content = useMDXComponent(attendee.body.code)

  return (
    <div className="w-full max-w-3xl gap-8 py-24">
      <div className="flex gap-16">
        <div>
          <h1 className="font-display text-5xl uppercase leading-none">{attendee.name}</h1>
          <div className="prose prose-sm prose-neutral prose-invert mt-8 text-neutral-400">
            <Content />
          </div>
        </div>
        <div className="relative size-64 shrink-0">
          <Image
            src={attendee.avatar}
            alt={attendee.name}
            fill
            className="object-contain object-center transition-transform duration-150 ease-in-out group-hover:scale-105"
          />
          <svg viewBox="0 0 689 689" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 fill-current text-black">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M233 0H0V689H558.5H689V0H233ZM233 0L643.5 92V591L558.5 689L35 571V302L233 0Z" />
          </svg>
        </div>
      </div>
      <ul className="mt-16 flex gap-2">
        {attendee.email && (
          <li>
            <Link href={`mailto:${attendee.email}`} className="flex size-12 items-center justify-center rounded-full bg-white hover:bg-blue">
              <EnvelopeIcon className="size-5 text-black" />
            </Link>
          </li>
        )}
        {attendee.whatsapp && (
          <li>
            <Link
              href={`https://wa.me/${attendee.whatsapp}`}
              className="flex size-12 items-center justify-center rounded-full bg-white hover:bg-green-600"
            >
              <WhatsappIcon className="size-5 text-black" />
            </Link>
          </li>
        )}
        {attendee.twitter && (
          <li>
            <Link href={attendee.twitter} className="flex size-12 items-center justify-center rounded-full bg-white hover:bg-blue">
              <TwitterIcon className="size-5 text-black" />
            </Link>
          </li>
        )}
        {attendee.linkedin && (
          <li>
            <Link href={attendee.linkedin} className="flex size-12 items-center justify-center rounded-full bg-white hover:bg-blue">
              <LinkedinIcon className="size-5 text-black" />
            </Link>
          </li>
        )}
        {attendee.instagram && (
          <li>
            <Link href={attendee.instagram} className="flex size-12 items-center justify-center rounded-full bg-white hover:bg-orange">
              <InstagramIcon className="size-5 text-black" />
            </Link>
          </li>
        )}
        {attendee.website && (
          <li>
            <Link href={attendee.website} className="flex size-12 items-center justify-center rounded-full bg-white hover:bg-magenta">
              <GlobeAltIcon className="size-5 text-black" />
            </Link>
          </li>
        )}
      </ul>
      <Image src={`/qr/${attendee.slug}.png`} alt={`QR Code ${attendee.name}`} width={310} height={310} className="mt-16 size-64" />
    </div>
  )
}
