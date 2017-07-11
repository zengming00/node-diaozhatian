
export function sleep(n: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(n);
    }, n);
  });
}

export function toInt(str: string, defaultValue: number = 0) {
  const v = parseInt(str, 10);
  return isNaN(v) ? defaultValue : v;
}

export function toBoolean(v: any) {
  if (v === 'true') {
    return true;
  } else if (v === 'false') {
    return false;
  }
  return !!v;
}

export function isEmptyObject(e: Record<string, any>) {
  if (!e) {
    return true;
  }
  for (const t in e) {
    if (e.hasOwnProperty(t)) {
      return false;
    }
  }
  return true;
}
