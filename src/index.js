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

export default {

    /**
     * Checks if a single permission is in the list
     * @param permission
     * @param list
     * @return {boolean}
     */
    isPermissionInList(permission, list) {
        if (typeof permission !== "string") {
            throw new TypeError(`isPermissionInList(): first argument must be a String`);
        }
        if (!(list instanceof Array)) {
            throw new TypeError(`isPermissionInList(): second argument must be an Array`);
        }
        return permission.length > 0 && list.indexOf(permission) !== -1;
    },

    /**
     * Checks if all permissions are in the list
     * @param permissions
     * @param list
     * @return {boolean}
     */
    isPermissionsInList(permissions, list) {
        if (!(permissions instanceof Array)) {
            throw new TypeError(`isPermissionsInList(): first argument must be an Array`);
        }
        if (!(list instanceof Array)) {
            throw new TypeError(`isPermissionsInList(): second argument must be an Array`);
        }

        let result = false;

        if (permissions.length) {
            result = true;

            for (let i = 0; i < permissions.length; i += 1) {
                if (!this.isPermissionInList(permissions[i], list)) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    },

    /**
     * Checks if one of the given permissions is in the list
     * @param permissions
     * @param list
     * @return {boolean}
     */
    isPermissionsOneOf(permissions, list) {
        if (!(permissions instanceof Array)) {
            throw new TypeError(`isPermissionsOneOf(): first argument must be an Array`);
        }
        if (!(list instanceof Array)) {
            throw new TypeError(`isPermissionsOneOf(): second argument must be an Array`);
        }

        let result = false;

        if (permissions.length) {
            for (let i = 0; i < permissions.length; i += 1) {
                if (this.isPermissionInList(permissions[i], list)) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    },

    /**
     * Merges one or more permissions
     * @param lists
     * @return {Array}
     */
    mergePermissions(...lists) {
        const permissions = [];

        for (let i = 0; i < lists.length; i += 1) {
            const list = lists[i];

            if (!(list instanceof Array)) {
                throw new TypeError(`mergePermissions(): all arguments must be instances of Array`);
            }

            for (let j = 0; j < list.length; j += 1) {
                const permission = list[j];

                if (typeof permission !== "string") {
                    throw new TypeError(`mergePermissions(): permission must be a String`);
                }

                if (permission.length && permissions.indexOf(permission) === -1) {
                    permissions.push(permission);
                }
            }
        }
        return permissions;
    }
};
