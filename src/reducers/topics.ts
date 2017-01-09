

type State = Array<string>;
type Action = { type: string; list: Array<any>; };

export function topics(state: State = [], action: Action): State {
  if (action.type === 'LOADED_SESSIONS') {
    let topicsMap = Object.create(null);
    action.list.forEach((session) => {
      let tags = session.get('tags') || [];
      tags.forEach((tag) => {
        topicsMap[tag] = true;
      });
    });
    return Object.keys(topicsMap).sort();
  }
  return state;
}
