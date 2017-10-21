import 'react-native';
import React from 'react';
import bodyParamsBuilder from '../../../utils/http-request';

import renderer from 'react-test-renderer';

describe('bodyParamsBuilder', () => {
  it('returns and empty string when no params are passed', () => {
    const params = {type: '', autonomousComunity: '', province: ''}

    expect(bodyParamsBuilder(params)).toBe('');
  });

  it('returns a url string prams built with the right params', () => {
    const params = {type: 'type', autonomousComunity: 'autonomousComunity', province: 'province'}

    expect(bodyParamsBuilder(params)).toBe("?petType=type&autonomousComunity=autonomousComunity&province=province");
  });

  it('returns a url string prams built with the right params', () => {
    const params = {type: 'type', autonomousComunity: 'autonomousComunity', province: ''}

    expect(bodyParamsBuilder(params)).toBe("?petType=type&autonomousComunity=autonomousComunity");
  });

  it('returns a url string prams built with the right params', () => {
    const params = {type: 'type', autonomousComunity: '', province: 'province'}

    expect(bodyParamsBuilder(params)).toBe("?petType=type&province=province");
  });

  it('returns a url string prams built with the right params', () => {
    const params = {type: '', autonomousComunity: 'autonomousComunity', province: 'province'}

    expect(bodyParamsBuilder(params)).toBe("?autonomousComunity=autonomousComunity&province=province");
  });

  it('returns a url string prams built with the right params', () => {
    const params = {type: 'type', autonomousComunity: '', province: ''}

    expect(bodyParamsBuilder(params)).toBe("?petType=type");
  });

  it('returns a url string prams built with the right params', () => {
    const params = {type: '', autonomousComunity: '', province: 'province'}

    expect(bodyParamsBuilder(params)).toBe("?province=province");
  });

  it('returns a url string prams built with the right params', () => {
    const params = {type: '', autonomousComunity: 'autonomousComunity', province: ''}

    expect(bodyParamsBuilder(params)).toBe("?autonomousComunity=autonomousComunity");
  });
})
