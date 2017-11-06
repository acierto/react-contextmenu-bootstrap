import R from 'ramda';

const indexedMap = R.addIndex(R.map);

export const invoke = R.curry((path, params, object) => {
    R.pipe(R.pathOr(R.F, path), R.apply(R.__, params))(object);
});

export default {
    indexedMap,
    invoke
};