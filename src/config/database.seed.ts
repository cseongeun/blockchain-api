import config from './database';

const seedConfig = Object.assign(config, {
  seeds: ['database/seeds/**/*{.ts,.js}'],
  factories: ['database/factories/**/*{.ts,.js}'],
})

export default seedConfig