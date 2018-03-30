/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Roles from '../src/index';

describe('Roles', () => {
  it('should be importable from package', () => {
    expect(typeof Roles).toEqual('object');
  });
});

describe('Roles.isPermissionInList(String, Array)', () => {
  it('should return true if permission is in list', () => {
    expect(Roles.isPermissionInList('test', ['test'])).toEqual(true);
  });

  it('should return false if permission is not in list', () => {
    expect(Roles.isPermissionInList('test', ['testing'])).toEqual(false);
  });

  it('should return false if permission is empty', () => {
    expect(Roles.isPermissionInList('', [''])).toEqual(false);
  });

  it('should throw an error if first argument is not a String', () => {
    expect(() => Roles.isPermissionInList(null, ['test'])).toThrow(Error);
  });

  it('should throw an error if second argument is not an Array', () => {
    expect(() => Roles.isPermissionInList('test', null)).toThrow(Error);
  });

  it('should be case sensitive', () => {
    expect(Roles.isPermissionInList('test', ['Test', 'TEST'])).toEqual(false);
  });
});

describe('Roles.isPermissionsInList(Array, Array)', () => {
  it('should return true if all permissions are in list', () => {
    expect(Roles.isPermissionsInList(['test'], ['test'])).toEqual(true);
  });

  it('should return false if all permissions are not in list', () => {
    expect(Roles.isPermissionsInList(['test', 'quit'], ['test'])).toEqual(false);
  });

  it('should return false if permissions are empty', () => {
    expect(Roles.isPermissionsInList([''], [''])).toEqual(false);
    expect(Roles.isPermissionsInList([], [''])).toEqual(false);
  });

  it('should throw an error if first argument is not an Array', () => {
    expect(() => Roles.isPermissionsInList(null, ['test'])).toThrow(Error);
  });

  it('should throw an error if second argument is not an Array', () => {
    expect(() => Roles.isPermissionsInList(['test'], null)).toThrow(Error);
  });

  it('should be case sensitive', () => {
    expect(Roles.isPermissionsInList(['test'], ['Test', 'TEST'])).toEqual(false);
  });
});

describe('Roles.isPermissionsOneOf(Array, Array)', () => {
  it('should return true if at least one permission is in list', () => {
    expect(Roles.isPermissionsOneOf(['test'], ['test', 'quit'])).toEqual(true);
  });

  it('should return false if permissions are not in list', () => {
    expect(Roles.isPermissionsOneOf(['quit'], ['test'])).toEqual(false);
  });

  it('should return false if permissions are empty', () => {
    expect(Roles.isPermissionsOneOf([''], [''])).toEqual(false);
    expect(Roles.isPermissionsOneOf([], [''])).toEqual(false);
  });

  it('should throw an error if first argument is not an Array', () => {
    expect(() => Roles.isPermissionsOneOf(null, ['test'])).toThrow(Error);
  });

  it('should throw an error if second argument is not an Array', () => {
    expect(() => Roles.isPermissionsOneOf(['test'], null)).toThrow(Error);
  });

  it('should be case sensitive', () => {
    expect(Roles.isPermissionsOneOf(['test'], ['Test', 'TEST'])).toEqual(false);
  });
});

describe('Roles.mergePermissions(...Array)', () => {
  it('should return merged permissions', () => {
    expect(Roles.mergePermissions(['quit'], ['test'], ['enter'])).toEqual(['quit', 'test', 'enter']);
  });

  it('should not merge duplicated permissions', () => {
    expect(Roles.mergePermissions(['test'], ['test'], ['test'])).toEqual(['test']);
  });

  it('should ignore empty permissions', () => {
    expect(Roles.mergePermissions([''], [''])).toEqual([]);
  });

  it('should throw an error if arguments are not instances of Array', () => {
    expect(() => Roles.mergePermissions(null, ['test'])).toThrow(Error);
  });

  it('should throw an error if arguments are not arrays of String', () => {
    expect(() => Roles.mergePermissions(['quit'], ['test', null])).toThrow(Error);
  });

  it('should be case sensitive', () => {
    expect(Roles.mergePermissions(['test'], ['Test', 'TEST'])).toEqual(['test', 'Test', 'TEST']);
  });
});
