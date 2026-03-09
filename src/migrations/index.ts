import * as migration_20260302_123944_latest_blocks from './20260302_123944_latest_blocks'
import * as migration_20260309_rename_hero_image_id_to_image_id from './20260309_rename_hero_image_id_to_image_id'

export const migrations = [
  {
    up: migration_20260302_123944_latest_blocks.up,
    down: migration_20260302_123944_latest_blocks.down,
    name: '20260302_123944_latest_blocks',
  },
  {
    up: migration_20260309_rename_hero_image_id_to_image_id.up,
    down: migration_20260309_rename_hero_image_id_to_image_id.down,
    name: '20260309_rename_hero_image_id_to_image_id',
  },
]
