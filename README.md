RootLayout (_layout.tsx)
└── Stack (Expo Router)
    └── Index (index.tsx)
        └── SafeAreaView
            ├── StatusBar
            └── TopSection (topSection.tsx)
                ├── Pressable (dropdown trigger)
                │   ├── Ionicons (caret icon)
                │   └── Text (active list name)
                └── Modal
                    └── GestureHandlerRootView
                        ├── Pressable (overlay to close modal)
                        └── View (modal content container)
                            └── MainListsModalContents (mainListsModalContents.tsx)
                                ├── AddMainList (addMainList.tsx)
                                │   ├── TextInput (list title input)
                                │   └── Pressable
                                │       └── Ionicons (add/checkmark icon)
                                └── SwipeableFlatList
                                    └── [Multiple] MainList Items
                                        ├── Pressable (main item)
                                        │   └── Text (list title)
                                        ├── LeftAction (Edit)
                                        │   └── Text ("Edit")
                                        └── RightAction (Delete)
                                            └── Pressable
                                                └── Text ("Delete")
