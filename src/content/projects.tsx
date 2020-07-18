import { lazy } from 'react'
import { importMDX } from 'mdx.macro'

import { IListItem } from './data'

export const PROJECTS: IListItem[] = [
  {
    key: 'daniguardiola-me',
    strongTitle: 'daniguardiola.me',
    title: 'my personal website (yes, this one)',
    tags: ['web', 'react', 'typescript', 'js', 'design', 'front-end'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    key: 'agario-slitherio-ninja',
    strongTitle: 'Agar.io & Slither.io Ninja',
    title: 'game mods that add advanced controls',
    tags: ['chrome-extension', 'fun', 'js'],
    Content: lazy(() => importMDX('./projects/agario-slitherio-ninja.mdx'))
  },
  {
    draft: true,
    key: 'electrumjs',
    strongTitle: 'electrumjs',
    title: 'an ElectrumX client for Node.js and the browser',
    tags: ['bitcoin', 'typescript', 'blockchain', 'web', 'crypto', 'js'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'coinwallet',
    title: 'coinwallet: crafting a lightweight Bitcoin wallet app from scratch',
    tags: ['js', 'react', 'crypto', 'bitcoin'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'bitcoin-lightweight',
    title:
      'bitcoin-lightweight: coding a lightweight wallet library for bitcoin',
    tags: ['js', 'typescript', 'nodejs', 'web', 'crypto', 'bitcoin'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'node-vault',
    title: 'node-vault: refactoring a Hashicorp Vault javascript client',
    tags: ['js', 'nodejs', 'security'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'timedoser-v1',
    title: 'TimeDoser v1: building my first app',
    tags: ['js', 'chrome', 'timedoser', 'design'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'timedoser-v2',
    title: 'TimeDoser v2: redesigning and coding a new version from scratch',
    tags: ['js', 'chrome', 'timedoser', 'design'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'telegram-welcome-bot',
    title: 'telegram-welcome-bot: building a greeter bot for Telegram groups',
    tags: ['js', 'nodejs', 'bots'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'incubator',
    title: 'incubator: crowdsourcing content through a custom platform',
    tags: ['js', 'php', 'web', 'fun'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'weplaybot',
    title: 'WePlayBot: creating a Twitter bot to play Pokemon Blue (Gameboy)',
    tags: ['js', 'python', 'chrome', 'fun', 'bots'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'zenflow',
    title: 'ZenFlow: adding self-destruction functionality to ZenPen',
    tags: ['js', 'web', 'fun', 'design'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'rektjs',
    title: 'rektjs: wasting my time in a useless and outdated meme',
    tags: ['js', 'web', 'fun'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'emoji-wars',
    title:
      'emoji-wars: depriving myself of sleep to build a chatbot game at a hackathon (gone wrong)',
    tags: ['js', 'web', 'fun'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'altruist-hackathon',
    title:
      'altrui.st (hackathon idea): winning a hackathon with a buzzwordy project',
    tags: ['js', 'web', 'crypto', 'fun'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'capturechat',
    title:
      'capturechat: capturing Whatsapp conversations with an interactive visor',
    tags: ['js', 'web', 'fun'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'pencil-material-template',
    title:
      'pencil-material-template: designing a better template for the Pencil prototyping app',
    tags: ['js', 'web', 'fun', 'design'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'facebook-picture-framer',
    title: 'Facebook picture framer: framing your Facebook profile picture',
    tags: ['js', 'web', 'fun'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  },
  {
    draft: true,
    key: 'playvibe-interface',
    title:
      'PlayVibe interface: adding a settings menu to an open-source Minecraft-enabled sex-toy',
    tags: ['js', 'web', 'fun'],
    Content: lazy(() => importMDX('./projects/daniguardiola-me.mdx'))
  }
]
