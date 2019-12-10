// https://stackoverflow.com/a/27120756/7771361

const PRE = '%BGN';
const POST = 'END%';

export function stringToFunction(str: string) {
  // Find parameters.
  const pStart = str.indexOf('(');
  const pEnd = str.indexOf(')');
  const params = str.substring(pStart + 1, pEnd);

  // Find body.
  const bStart = str.indexOf('{');
  const bEnd = str.lastIndexOf('}');
  const body = str.substring(bStart + 1, bEnd);

  // eslint-disable-next-line no-new-func
  return Function(params.trim(), body);
}

export function stringify(data: any): string {
  return JSON.stringify(data, (_k, v) => {
    // Convert function to string.
    if (typeof v === 'function') {
      return PRE + v.toString() + POST;
    }
    return v;
  });
}

export function parse(data: string): any {
  return JSON.parse(data, (_k, v) => {
    // Convert string to function.
    if (typeof v === 'string' && v.startsWith(PRE) && v.endsWith(POST)) {
      return stringToFunction(v.substring(PRE.length, v.length - POST.length));
    }
    return v;
  });
}
