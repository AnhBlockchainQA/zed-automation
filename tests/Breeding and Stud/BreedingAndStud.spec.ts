import Authorization from '../../pages/Authorization.page';
import * as data from '../../fixtures/qa.json';
import Metamask from '../../pages/Metamask.module';
import { BrowserContext, Page } from 'playwright';
import BreedingAndStud from '../../pages/BreedingAndStud.page'

describe('Breeding And Stud', () => {
  let auth: Authorization;
  let pages: any;
  let browserContext: BrowserContext;
  let metamask: Metamask;
  let breedingAndStud: BreedingAndStud

  beforeAll(async () => {
    metamask = new Metamask();
    browserContext = await metamask.init();
    pages = await metamask.authenticate(browserContext);
    auth = new Authorization(pages);
    breedingAndStud = new BreedingAndStud(pages)
  });

  beforeEach(async () => {
    await pages[0].goto(data.baseUrl);
    await pages[0].waitForLoadState();
  });

  afterAll(async () => {
    await pages[0].close();
    await browserContext.close();
    await metamask.close(pages, browserContext);
  });

  xit('ZED-XX - Not Implemented Yet', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });


  describe('Breeding', () => {

    xit('ZED-69 - Breeding Service does not show Female horses on  breeding modal when are younger than 1 month', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-70 - Breeding Services does not show Female horses on breeding modal when are running in a race or has being registered to one', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-71 - Breeding Service does not allow the user to put bred male horse younger than 1 month in stud (From stable or direct horse page)', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-72 - Breeding Service does not allow 1-month minimum breeding for Genesis horses', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-120 - Breeding Service allows the user to select a valid FEMALE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-121 - Breeding Service allows the user to select a valid STUD', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-122 - Breeding Service allows the user to BUY COVER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-123 - Breeding Service allows the user to cancel the transaction of BUY COVER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-124 - Breeding service revokes the BUY COVER transaction is the HORSE is not in STUD', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-186 - Breeding is showing the list of RACEHORSES', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-187 - Breeding is loading RACEHORSES through infinite scroll loading/pagination', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-188 - Breeding is showing the FILTER collapse panel after hit on the FILTERS button', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-189 - Breeding allows the user to filter racehorses by GENERATION range', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-190 - Breeding allows the user to filter racehorses by BLOODLINE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-191 - Breeding allows the user to filter racehorses by GENDER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-192 - Breeding allows the user to filter racehorses by BREEDS', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-193 - Breeding allows the user to SORT by Recently Listed', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-194 - Breeding allows the user to SORT by Expired Soon', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-195 - Breeding allows the user to SORT by Highest Price', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-196 - Breeding allows the user to SORT by Lowest Price', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-197 - Breeding allows the user to SEARCH and the result match with the text/chars entered', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-198 - Breeding racehorse list is showing the stable name of each horse', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-199 - Breeding racehorse list is showing the TIME LEFT in format DD HH MM like 2d 9h 6m', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-200 - Breeding racehorse list is showing the STUD FEE per horse', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-201 - Breeding racehorse list is showing the Horse Name', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-202 - Breeding racehorse list is showing the GEN + BLOODLINE below the Horse Name', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-203 - Breeding allows the user to open collapsed panel after click on a horse of the list.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-204 - Breeding Horse Details Panel shown the Horse GEN', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-205 - Breeding Horse Details Panel shown the Horse BLOODLINE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-206 - Breeding Horse Details Panel shown the Horse GENDER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-207 - Breeding Horse Details Panel shown the Horse COAT', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-208 - Breeding Horse Details Panel shown the Horse RACES', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-209 - Breeding Horse Details Panel shown the Horse CAREER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-210 - Breeding Horse Details Panel shown the Horse WIN RATE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-211 - Breeding Horse Details Panel shown the Horse OFFSPRING', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-212 - Breeding Horse Details Panel shown the Horse OWNER STABLE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-213 - Breeding Horse Details Panel shown the Horse TIME LEFT', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-214 - Breeding Horse Details Panel shown the Horse STUD FEE in a box close to the SELECT MATE button', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-215 - Breeding Horse Details Panel shown SELECT MATE button and perform the action after a click', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-216 - Breeding Horse Details Panel shown the - icon as a close link action of the collapse section and closes it after a click', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

  });

  describe('Stud', function() {
    xit('ZED-57 - Stud Service allows the user to BREED racehorse while racehorse is in STUD', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-58 - Stud Service is showing the Racehorse when is added IN STUD', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-59 - Stud Service is showing the racehorse details', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-60 - Stud Service allows the Colt can breed 3 times during their breeding cycle', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-61 - Stud Service allows the user to move the male Genesis racehorse into Stud service with a duration is 1 day or 3 days or 7 days', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-62 - Stud Service allows the user to cancel the pushing process the racehorse into the In Stub', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-63 - Stud Service is not showing the racehorse on the Stud Service page in the expiration after 1-3-7 days', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-64 - Stud Service does not allow the user to push In Stud if the racehorse is in Race', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-65 - Stud Services allows the user to cancel the stub Service process', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-66 - Stud Service allows the user to set a name to a horse after is being generated', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-67 - Stud Service allows the user to transfer horse to other account after name has being assigned', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-68 - Stud Service allows the user to put into the gate nomination after the name has being assigned', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

  });

  describe('Offspring Performance', () => {

    xit('ZED-137 - Offspring is showing the Parents of a Horse', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-138 - Offspring is showing the Average wins percentage even when just shows the Parents of the Horse', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-139 - Offspring is showing the Average Win percentage of the offspring of the horse', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-140 - Offspring is showing the descendant/offspring horses in a styled card and the user is able to click/redirect to horse details.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-141 - Offspring is showing `Your Colt has no offsprings yet` when the horse has no descendant/offspring horses associated', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-142 - Offspring is showing the `Breed` button when the colt has no offsprings yet and allows to redirect to the action.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-143 - Offspring is showing `Unable to Bree` if the horse does not have at least one month of born.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-144 - Offspring is showing the `Time Left: 22 Day(s)` to put the horse in Stud or Breed.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-145 - Offspring is showing the `LOAD MORE` button when the stable/owner has more than 6 horses shown in the section', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-146 - Offspring is showing `6 of 14 offsprings` as a counter of the stable/owner horses on the top left section of the card', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

  });

  describe('Horse Details', () => {
    beforeEach(async() => {
      await pages[0].click(breedingAndStud.objects.btnBreeding)
      await pages[0].click(breedingAndStud.objects.lstHorses(1))
    })

    it('ZED-148 - Horse details are showing the horse name on top of the section in a big font size', async () => {
      const horseName = await pages[0].innerText(breedingAndStud.objects.lblHorseName)
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      const horseHeader = await pages[0].innerText(breedingAndStud.objects.lblHorseHeader)
      expect(horseHeader).toBe(horseName)
    });

    it('ZED-149 - Horse details are showing the `Share` link/icon on the top/right section of the top', async () => {
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      await pages[0].click(breedingAndStud.objects.btnShare)
      const urlShared = await pages[0].getAttribute(breedingAndStud.objects.textShareUrl, 'value')
      expect(urlShared).toBe(pages[0].url())
      await pages[0].click(breedingAndStud.objects.btnCopy)
      await pages[0].waitForSelector(breedingAndStud.objects.imgCopied)
      const urlCopied = await pages[0].evaluate(async () => await navigator.clipboard.readText())
      expect(urlCopied).toBe(urlShared)
    });

    xit('ZED-150 - Horse details is showing the horse render in the center of the top section', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-151 - Horse details are showing the `view 3D` icon/link to enable the 3D rendering', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-152 - Horse details allow the user to see the horse render in 3D modal after click on the `view 3D` link/icon', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-153 - Horse details allow the user to close 3D view after click on `X` button of the top right side of the modal.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-154 - Horse details allow the user to use to mouse move (left-right) event to view the 3D rendering of the horse', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-155 - Horse details is showing the Stable Owner below the horse render section', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-156 - Horse details has showing the BLOODLINE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-157 - Horse details has showing the GEN', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-158 - Horse details has showing the GENDER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-159 - Horse details has showing the COAT', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-160 - Horse details has showing the number of RACES', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-161 - Horse details has showing the number of CAREER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-162 - Horse details has showing the percentage WIN RATE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-163 - Horse details has showing the OFFSPRING left', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

  });
});
