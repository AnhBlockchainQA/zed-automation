import { request } from 'playwright'
import * as data from '../fixtures/qa.json';

class RacingAPI {
  private token: string = ''

  async apiContext(url: string) {
    return await request.newContext({
      baseURL: url,
      extraHTTPHeaders: {
        Authorization: this.token
      }
    })
  }

  async apiLogin() {
    const req = await this.apiContext(data.api.gateway)
    const res: any = await req.post('/api/v1/users/login', {
        data: {
            public_address: data.metamask_login.public_address,
            signed_message: data.metamask_login.signed_message
        }
    })
    this.token = `Bearer ${await res.json().then((r: any) => r.jwt)}`
    expect(res.status()).toBe(200)
  }

  async apiNominateHorse() {
    let req = await this.apiContext(data.api.racing)
    let res = await req.get('/api/v1/races', {
        params: {
            status: 'open'
        }
    })
    let races = await res.json().catch(() => [])
    if (races.length === 0) return
    races = races.filter((r:any) => r.fee === '0.0' && Object.keys(r.gates).length < 12)

    for (const r of races) {
      let horses = await this.getEligibleHorse(r.race_id, r.class, 5)
      if (horses.length === 0) continue

      const allGates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      const usedGates = Object.keys(r.gates).map(g => Number(g))
      const openGates = allGates.filter(g => !usedGates.includes(g))
      const total = Math.min(horses.length, openGates.length)
      
      for (let i = 0; i < total; i++) {
          req = await this.apiContext(data.api.racing)
          res = await req.post('/api/v1/races/register', {
              data: {
                  gate: openGates[i],
                  horse_id: horses[i].horse_id,
                  race_id: r.race_id
              }
          })
          expect(res.status()).toBe(200)
          req = await this.apiContext(data.api.gateway)
          res = await req.post('/api/v1/activity', {
              data: {
                  params: {
                      code: '6',
                      horse_list: [
                        `${horses[i].hash_info.name}`
                      ],
                      activity_params: {
                        race_id: r.race_id,
                        race_name: r.name
                      }
                    }
              }
          })
          expect(res.status()).toBe(200)
      }
    }
  }

  async getEligibleHorse(raceId: string, raceClass: string, count: number): Promise<any> {
    const allHorses = []
    for (let i = 0; i < count; i++) {
      const req = await this.apiContext(data.api.gateway)
      const res = await req.get(`/api/v1/races/${raceId}/available_race_horses`, {   
          params: {
              public_address: data.metamask_login.public_address,
              offset: i * 10,
              horse_name: '',
              race_class: raceClass
          }
      })
      let horses = await res.json().catch(() => [])
      if (horses.length === 0) break
      horses = horses.filter((h: any) => h.is_eligible)
      allHorses.push(...horses)
    }
    return allHorses
  }
}

export default RacingAPI;
