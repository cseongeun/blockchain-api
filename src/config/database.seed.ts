import config from './database';

/* 
  데이터 베이스 초기 시드 작업을 위한 config 
*/
const seedConfig = Object.assign(config, {
  seeds: ['database/seeds/**/*{.ts,.js}'],
})

export default seedConfig