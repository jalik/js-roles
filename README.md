# @jalik/roles

A low level library meant to easily build secured applications using **Role Based Access Control (RBAC)**.

## Introduction

Role-based-access-control (RBAC) is a policy neutral access control mechanism defined around roles and privileges. The components of RBAC such as role-permissions, user-role and role-role relationships make it simple to perform user assignments. A study by NIST has demonstrated that RBAC addresses many needs of commercial and government organizations. RBAC can be used to facilitate administration of security in large organizations with hundreds of users and thousands of permissions. Although RBAC is different from MAC and DAC access control frameworks, it can enforce these policies without any complication. Its popularity is evident from the fact that many products and businesses are using it directly or indirectly.

Source: https://en.wikipedia.org/wiki/Role-based_access_control

**This library is tested with unit tests.**

## Defining permissions

The central element of this lib is the permission, so first you need to setup your roles, which are just arrays of permissions.
Note that you could store this permissions in database, in a file or just in-memory, it's up to you since this lib is only giving the bricks to build your own RBAC system.

```js
// Define member permissions
const memberPermissions = [
    "upload_photo",
    "delete_own_photo",
    "create_post",
    "edit_own_post",
    "delete_own_post"
];

// Define admin permissions
const adminPermissions = [
    "administrate",
    "add_user",
    "edit_user",
    "delete_user"
];
```

## Checking a single permission

To check a single permission, use the method `isPermissionInList(String, Array)`.

```js
import Roles from "@jalik/roles";

// Define user permissions
const userPermissions = [
    "upload_photo",
    "delete_own_photo"
];

if (Roles.isPermissionInList("delete_own_photo", userPermissions)) {
    // delete the photo...
}
```

## Checking a list of permissions

To check if all permissions are present, use the method `isPermissionsInList(String, Array)`, if one permission is missing the method will return false.

```js
import Roles from "@jalik/roles";

// Define user permissions
const userPermissions = [
    "upload_photo",
    "delete_own_photo"
];

// Allow testers to upload a photo
if (Roles.isPermissionsInList(["test", "upload_photo"], userPermissions)) {
    // upload the photo...
}
```

## Checking a permission in a list

To check if at least one permission is present, use the method `isPermissionsOneOf(Array, Array)`.

```js
import Roles from "@jalik/roles";

// Define user permissions
const userPermissions = [
    "delete_any_photo"
];

// Allow admins and members to delete a photo
if (Roles.isPermissionsOneOf(["delete_any_photo", "delete_own_photo"], userPermissions)) {
    // delete the photo...
}
```

## Merging permissions

In case that you have several permissions lists, you can merge them with the method `mergePermissions(...Array)`, this method only removes duplicates.

```js
import Roles from "@jalik/roles";

// Define user permissions
const userPermissions = [
    "delete_own_photo",
    "edit_own_post",
];

// Define manager permissions
const managerPermissions = [
    "delete_any_photo",
    "delete_any_post",
    "edit_any_post"
];

// Merge permissions
const perms = Roles.mergePermissions(userPermissions, managerPermissions);

if (Roles.isPermissionInList("delete_any_post", perms)) {
    // delete the post...
}
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).


## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).

If you find this lib useful and would like to support my work, donations are welcome :)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Z8JZ5UY93Y5PN)
