import R from 'ramda';

export const invoke = R.curry((path, params, object) => {
    R.pipe(R.pathOr(R.F, path), R.apply(R.__, params))(object);
});