# `gengen` #

`gengen` is a generic text snippet generator generator. Check out the
[unicorn name generator](gengen.html?gen=%5B%7B%22p%22%3A1%2C%22words%22%3A%5B%22Merry%22%2C%22Bright%22%2C%22Sun%22%2C%22Star%22%2C%22Twinkle%22%2C%22Moon%22%2C%22River%22%2C%22Umbra%22%2C%22Nebula%22%2C%22Halcyon%22%2C%22Comet%22%2C%22Forest%22%2C%22Meadow%22%2C%22Sugar%22%2C%22Swift%22%2C%22Silver%22%2C%22Gold%22%2C%22Bronze%22%2C%22Mica%22%2C%22Blood%22%2C%22Qho%22%5D%2C%22fragment%22%3Afalse%2C%22dependents%22%3A%5B%5D%2C%22prereq%22%3Anull%7D%2C%7B%22p%22%3A1%2C%22words%22%3A%5B%22sparkle%22%2C%22beam%22%2C%22shine%22%2C%22dust%22%2C%22glitter%22%2C%22sweetness%22%2C%22blaze%22%2C%22fire%22%2C%22whisper%22%2C%22sweet%22%2C%22rush%22%2C%22canter%22%2C%22hoof%22%2C%22sprite%22%2C%22spangle%22%2C%22blossom%22%2C%22ghost%22%2C%22wisp%22%2C%22tree%22%2C%22amber%22%2C%22rin%22%2C%22rain%22%2C%22holly%22%2C%22water%22%5D%2C%22fragment%22%3Atrue%2C%22dependents%22%3A%5B%5D%2C%22prereq%22%3Anull%7D%2C%7B%22p%22%3A0.18%2C%22words%22%3A%5B%22of%22%2C%22from%22%2C%22by%22%2C%22upon%22%5D%2C%22fragment%22%3Afalse%2C%22dependents%22%3A%5B%7B%22p%22%3A1%2C%22words%22%3A%5B%22Glen%22%2C%22Oak%22%2C%22Sky%22%2C%22Snow%22%2C%22Shadow%22%2C%22Mountain%22%2C%22Swamp%22%2C%22East%22%2C%22West%22%2C%22South%22%2C%22North%22%2C%22Gold%22%2C%22Black%22%5D%2C%22fragment%22%3Afalse%2C%22dependents%22%3A%5B%5D%2C%22prereq%22%3Anull%7D%2C%7B%22p%22%3A1%2C%22words%22%3A%5B%22Down%22%2C%22Fall%22%2C%22Tower%22%2C%22Door%22%2C%22Stream%22%2C%22Palace%22%2C%22Town%22%2C%22Watch%22%2C%22Castle%22%5D%2C%22fragment%22%3Afalse%2C%22dependents%22%3A%5B%5D%2C%22prereq%22%3Anull%7D%5D%2C%22prereq%22%3Anull%7D%2C%7B%22p%22%3A0.12%2C%22words%22%3A%5B%22the%22%5D%2C%22fragment%22%3Afalse%2C%22dependents%22%3A%5B%7B%22p%22%3A1%2C%22words%22%3A%5B%22Spear%22%2C%22Ace%22%2C%22Axe%22%2C%22Sword%22%2C%22Lance%22%2C%22Steel%22%2C%22Stout%22%2C%22Half%22%5D%2C%22fragment%22%3Afalse%2C%22dependents%22%3A%5B%5D%2C%22prereq%22%3Anull%7D%2C%7B%22p%22%3A1%2C%22words%22%3A%5B%22Heart%22%2C%22Horn%22%2C%22Hoof%22%2C%22Back%22%2C%22Hide%22%2C%22Hand%22%5D%2C%22fragment%22%3Afalse%2C%22dependents%22%3A%5B%5D%2C%22prereq%22%3Anull%7D%5D%2C%22prereq%22%3Anull%7D%5D)
if you're not sure what that means.

## Here is how to use `gengen`: ##

- Create one or more __terms__ and enter a newline-separated list of possible values. The generator will select a random value from this list to appear in the output.
    - A term can be a _fragment_. Fragments are appended to the previous word rather than rendered separately (e.g., "Grognak" instead of "Grog nak").
    - You can change a term's _inclusion probability_, which determines how likely it is to appear in the output.
    - A term can have any number of _dependent_ terms. A dependent term is included in the output only if its parent is included.
        - A dependent term can have an additional _inclusion condition_. If a term has an inclusion condition, it is included in the output only if the value selected from its parent's word list matches the inclusion condition.
- Run your generator by clicking __generate__.
- Clicking __snippet__ will display a JavaScript implementation of your generator. You can reuse this on other websites if you want to.
- Clicking __link__ will display a (long and ugly-looking) link to your generator.

