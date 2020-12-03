export type BlogOGImageParams = {
  id: string
  title: string
}

export default function BlogOGImageTemplate ({ title }: BlogOGImageParams) {
  const css = `
  .font-slab {
    font-family: 'Roboto Slab', serif;
  }
  
  .font-mono {
    font-family: 'Roboto Mono', mono;
  }
  
  .pattern {
    background-image: radial-gradient(#ffffff9e 10%, transparent 2px);
    background-position: 0 0;
    background-size: 24px 24px;
    -webkit-mask: linear-gradient(red, transparent);
  }
  `
  return (
    <>
      <html className='w-full h-full'>
        <head>
          <link
            href='https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'
            rel='stylesheet'
            type='text/css'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;351;400;700&amp;display=swap'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto+Mono&amp;display=swap'
          />
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>

        <body className='flex flex-col w-full h-full'>
          <div className='fixed top-0 left-0 w-full h-52 pattern'></div>
          <div className='flex items-end w-full px-16 py-16 text-6xl font-light text-white bg-green-900 h-96 font-slab'>
            <p className='leading-tight'>{title}</p>
          </div>
          <div className='flex items-center justify-center flex-grow'>
            <p className='font-mono text-6xl text-black'>
              daniguardio.la
              <span className='font-bold text-green-900'>{' > blog'}</span>
            </p>
          </div>
          {/* <p className='px-16 pt-8 text-4xl italic leading-relaxed text-green-900 font-slab'>
            {description}
          </p> */}
        </body>
      </html>
    </>
  )
}
