import { Fragment } from 'react'
import Link from 'next/link'
import { PostList as PostListType } from 'lib/static/posts'
import { format, getYear } from 'date-fns'

export default function PostList ({
  category,
  posts
}: {
  category: string
  posts: PostListType
}) {
  let lastYear = 3000
  return (
    <ul>
      {posts.map(({ id, title, timestamp, description }) => {
        const year = getYear(timestamp)
        let yearHeading
        if (year < lastYear) {
          yearHeading = <li className='font-bold '>{year}</li>
          lastYear = year
        }
        return (
          <Fragment key={id}>
            {yearHeading}
            <li className='py-2 group'>
              <Link href={`/${category}/${id}`}>
                <a>
                  <p>
                    <span className='bg-green-900 mr-2 sm:mr-4 px-1 py-0.5 rounded text-white text-xs font-bold'>
                      <span className='hidden sm:inline-block'>
                        {format(timestamp, 'MMMM d')}
                      </span>
                      <span className='sm:hidden'>
                        {format(timestamp, 'MMM d')}
                      </span>
                    </span>
                    <span className='group-hover:underline'>{title}</span>
                  </p>
                  <p className='mt-1 mb-2 text-sm italic'>{description}</p>
                </a>
              </Link>
            </li>
          </Fragment>
        )
      })}
    </ul>
  )
}
