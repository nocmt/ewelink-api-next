# CHANGELOG

February 27th, 2024 v1.0.4

- Fix: Update dependent versions

October 18th, 2023 v1.0.3

- Feat: Modify the description of the type parameter in sendCode, setDeviceTags, setThingStatus, and getThingStatus, and support more explicit parameter content
- Doc: README.md Add FAQ content

August 31th, 2023 v1.0.2

- Feat: Support for CommonJS module

August 22th, 2023 v1.0.1

- Fix: Fix bug in device.getAllThingsAllPages() and user.refreshToken() method

August 21th, 2023 v1.0.0

- Refactor: other.dispatch(region: string)、change user.setUserInfo to user.updateUserInfo
- Refactor: user.logout() Cancel at parameter transfer
- Feat: New document description, open source project

August 4th, 2023 v0.0.8

- Feat: Add responseTime in response
- Fix: Error modifying getRegion

June 27th, 2023 v0.0.6

- Fix: Fix the error reported when the device encryption is canceled and then controlled in the LAN control
- Fix: Fix invalid setUrl function
- Refactor: Lan module discovery function type parameter position adjustment, can be left blank by default
- Feat: Add optional parameters：refreshToken、setUserInfo

September 9th, 2022 v0.0.5

- Feat: New support for LAN discovery and selective transfer callback function when websocket creates a connection

August 29th, 2022 v0.0.4

- Feat: Add the definition of log print object during instantiation
- Refactor: Replace token with global parameter at and add rt parameter
- Feat: Add WebSocket Control function
- Feat: Add Lan Control function
- Refactor: Major changes, change the parameters of the instantiated object and delete the requestRecord and logLevel parameters

July 29th, 2022 v0.0.3

- Fix: Continue to fix some errors in the documentation
- Feat: Add statement of MIT agreement
- Feat: Add relevant interface methods of OAuth2.0

July 29th, 2022 v0.0.2

- Fix: Fix some errors in the description document and the dependent storage location.

July 29th, 2022 v0.0.1

- Feat: The first version provides the methods of the basic 50 V2 interfaces for use.