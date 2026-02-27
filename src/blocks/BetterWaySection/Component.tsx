import React from 'react'

type BetterWayItem = {
  title: string
  description: string
  id?: string
}

type Props = {
  heading?: string
  items?: BetterWayItem[]
}

export const BetterWaySectionComponent: React.FC<Props> = (props) => {
  const { heading, items } = props

  return (
    <section className="py-20 bg-[#F3F6FD]">
      <div className="site-containers">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-cal text-black leading-tight">
            {heading || 'A Better Way With Commerx'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items?.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white rounded-[16px] p-8 md:p-10 flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <h3 className="text-[18px] md:text-[22px] font-bold font-sans text-black mb-4">
                {item.title}
              </h3>
              <p className="text-[14px] md:text-[16px] text-[#555555] font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
