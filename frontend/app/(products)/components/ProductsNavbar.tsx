import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useMediaQuery } from 'react-responsive'
import { RxHamburgerMenu } from 'react-icons/rx'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import ThemeToggler from '@/components/ThemeToggler'

const LINKS: { href: string; text: string }[] = [
  {
    href: '/swap',
    text: 'Swap',
  },
  {
    href: '/liquidity',
    text: 'Liquidity',
  },
  {
    href: 'https://octaswap.io/launchpad',
    text: 'Launchpad',
  },
  {
    href: 'https://octaswap.io/claim',
    text: 'Vesting',
  },
]

type LinksType = typeof LINKS

function NavigationLink({ link }: { link: LinksType[number] }) {
  const pathname = usePathname()
  const isActive = link.href === pathname

  return (
    <Link href={link.href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle(), 'text-xl md:text-lg')}
        active={isActive}
        target={
          link.href === 'https://octaswap.io/launchpad' || link.href === 'https://octaswap.io/claim'
            ? '_blank'
            : '_self'
        }
      >
        {link.text}
      </NavigationMenuLink>
    </Link>
  )
}

function Navigation({ links, orientation }: { links: LinksType; orientation: 'horizontal' | 'vertical' }) {
  const isNotMobile = useMediaQuery({ query: '(min-width: 768px)' })

  return (
    <NavigationMenu orientation={orientation} className={cn(!isNotMobile && 'flex-none')}>
      <NavigationMenuList className={cn(!isNotMobile && 'flex-col items-start gap-y-3 space-x-0')}>
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationLink link={link} />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function Desktop({ links }: { links: LinksType }) {
  return <Navigation links={links} orientation='horizontal' />
}

function Mobile({ links }: { links: LinksType }) {
  const isNotMobile = useMediaQuery({ query: '(min-width: 768px)' })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <RxHamburgerMenu className='h-7 w-7' />
        </button>
      </SheetTrigger>
      <SheetContent side='left'>
        <div className={cn(!isNotMobile && 'flex h-full flex-col justify-between')}>
          <Navigation links={links} orientation='vertical' />
          <ThemeToggler />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function ProductsNavbar() {
  const isNotMobile = useMediaQuery({ query: '(min-width: 768px)' })

  return isNotMobile ? <Desktop links={LINKS} /> : <Mobile links={LINKS} />
}
