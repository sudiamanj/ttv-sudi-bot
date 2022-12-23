/**
 * Uses the YGOPRODeck API to look up information about any Yu-Gi-Oh! card.
 *
 * @see https://ygoprodeck.com/api-guide/ for more info.
 */
const API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
const IGNORE_KEYS = ["archetype", "card_sets", "card_images", "card_prices"];

const formatters = {
  banlist_info: (info) =>
    Object.entries(info)
      .map(([k, v]) => {
        const format = k.replace("ban_", "");
        return `${format.toUpperCase()}: ${v}`;
      })
      .join(" • "),
};

export default async function (user, cardName) {
  // Card name is required.
  if (!cardName) {
    return;
  }

  const resp = await fetch(`${API_URL}?fname=${cardName}`);
  const respObject = await resp.json();
  if (respObject.error) {
    return respObject.error;
  }
  // If an exact match is found, use that.
  // Otherwise, just go with the first result.
  const card =
    respObject.data.find(
      ({ name }) => name.toUpperCase() === cardName.toUpperCase()
    ) ?? respObject.data[0];
  return Object.entries(card)
    .filter(([k]) => !IGNORE_KEYS.includes(k))
    .map(([k, v]) => formatters[k]?.(v) ?? `${k.toUpperCase()}: ${v}`)
    .join(" • ");
}
