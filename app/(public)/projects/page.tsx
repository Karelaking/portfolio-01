import React from 'react'

const Page = (): React.ReactNode => {
  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-background py-20 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Projects
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
            Design and build of my beautiful ideas 
          </h2>
          <p className="mt-3 text-base text-muted-foreground px-4 sm:px-24">
            A curated collection of photographs showcasing the beauty and diversity of our world, captured by my mobile device camera.
          </p>
        </div>
      </div>
      
        </section>
  )
}

export default Page