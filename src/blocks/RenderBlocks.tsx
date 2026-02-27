import React, { Fragment } from 'react'

import type { Page, Service } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { InsightsSectionComponent } from '@/blocks/InsightsSection/Component'
import { TabSectionComponent } from '@/blocks/TabSection/Component'
import { StatsSectionComponent } from '@/blocks/StatsSection/Component'
import { CompaniesSectionComponent } from '@/blocks/CompaniesSection/Component'
import { PathwaySectionComponent } from '@/blocks/PathwaySection/Component'
import { HelpSectionComponent } from '@/blocks/HelpSection/Component'
import { CTASectionComponent } from '@/blocks/CTASectionBlock/Component'
import { MarketingHeroSectionComponent } from '@/blocks/MarketingHeroSection/Component'
import { WhyCommerxSectionComponent } from '@/blocks/WhyCommerxSection/Component'
import { WhatWeDoSectionComponent } from '@/blocks/WhatWeDoSection/Component'
import { MissionVisionSectionComponent } from '@/blocks/MissionVisionSection/Component'
import { BetterWaySectionComponent } from '@/blocks/BetterWaySection/Component'
import { AboutHeroSectionComponent } from '@/blocks/AboutHeroSection/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  insightsSection: InsightsSectionComponent,
  tabSection: TabSectionComponent,
  statsSection: StatsSectionComponent,
  companiesSection: CompaniesSectionComponent,
  pathwaySection: PathwaySectionComponent,
  helpSection: HelpSectionComponent,
  ctaSection: CTASectionComponent,
  marketingHeroSection: MarketingHeroSectionComponent,
  whyCommerxSection: WhyCommerxSectionComponent,
  whatWeDoSection: WhatWeDoSectionComponent,
  missionVisionSection: MissionVisionSectionComponent,
  betterWaySection: BetterWaySectionComponent,
  aboutHeroSection: AboutHeroSectionComponent,
}

export const RenderBlocks: React.FC<{
  blocks: (Page['layout'][0] | Service['layout'][0])[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              const noMarginBlocks = [
                'marketingHeroSection',
                'whyCommerxSection',
                'ctaSection',
                'aboutHeroSection',
              ]
              const hasNoMargin = noMarginBlocks.includes(blockType)
              return (
                <div className={hasNoMargin ? '' : 'my-16'} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
