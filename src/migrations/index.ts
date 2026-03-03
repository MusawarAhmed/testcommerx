import * as migration_20260302_123944_latest_blocks from './20260302_123944_latest_blocks'

export const migrations = [
  {
    up: migration_20260302_123944_latest_blocks.up,
    down: migration_20260302_123944_latest_blocks.down,
    name: '20260302_123944_latest_blocks',
  },
]
