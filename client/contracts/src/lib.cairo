use starknet::ContractAddress;

#[derive(Drop, Serde, starknet::Store)]
struct Post {
    userAddress: ContractAddress,
    message: felt252,
    imageUrl: felt252,
    timestamp: u32,
    topic: felt252,
    likes: u32,
    tokensTipped: u128,
    //messages: LegacyMap::<u128, felt252>,
    deleted: bool,
}

// struct message

#[starknet::interface]
trait ISimpleStorage<TContractState> {
    fn getPostLength(self: @TContractState) -> u128;
    fn addPost(ref self: TContractState, userAddress: ContractAddress, message: felt252, imageUrl: felt252, timestamp: u32, topic: felt252);
    fn getPost(self: @TContractState, index: u128) -> Post;
    fn getAllPosts(self: @TContractState) -> Array<Post>;
    fn addLike(ref self: TContractState, index: u128);
    fn addTip(ref self: TContractState, index: u128, tip: u128);
}

#[starknet::contract]
mod SimpleStorage {
    use starknet::get_caller_address;
    use starknet::ContractAddress;
    use array::ArrayTrait;
    use super::Post;


    #[storage]
    struct Storage {
        posts: LegacyMap::<u128, Post>,
        postLength: u128,
    }

    #[abi(embed_v0)]
    impl SimpleStorage of super::ISimpleStorage<ContractState> {
        fn getPostLength(self: @ContractState) -> u128 {
            self.postLength.read()
        }
        fn addPost(ref self: ContractState, userAddress: ContractAddress, message: felt252, imageUrl: felt252, timestamp: u32, topic: felt252) {
            //let mut messageArray = ArrayTrait::<felt252>::new();

            let _new_post = Post {
                userAddress: userAddress,
                message: message,
                imageUrl: imageUrl,
                timestamp: timestamp,
                topic: topic,
                likes: 0,
                tokensTipped: 0,
                //messages: LegacyMap::new,
                deleted: false
            };
            let _currentPostLength = self.postLength.read();
            self.posts.write(_currentPostLength, _new_post);
            self.postLength.write(_currentPostLength + 1);
        }
        fn addTip(ref self: ContractState, index: u128, tip: u128) {
            let _currentPostLength = self.postLength.read();
            assert!(index >= 0, "index is negative");
            assert!(index < _currentPostLength, "index is more than the number of posts");
            let mut post = self.posts.read(index);
            let likedPost = Post {
                userAddress: post.userAddress,
                message: post.message,
				imageUrl: post.imageUrl,
                timestamp: post.timestamp,
                topic: post.topic,
                likes: post.likes,
                tokensTipped: post.tokensTipped + tip,
                //messages: LegacyMap::new,
                deleted: post.deleted,
            };
            self.posts.write(index, likedPost);
        }
        fn addLike(ref self: ContractState, index: u128) {
            let _currentPostLength = self.postLength.read();
            assert!(index >= 0, "index is negative");
            assert!(index < _currentPostLength, "index is more than the number of posts");
            let mut post = self.posts.read(index);
            let likedPost = Post {
                userAddress: post.userAddress,
                message: post.message,
				imageUrl: post.imageUrl,
                timestamp: post.timestamp,
                topic: post.topic,
                likes: post.likes + 1,
                tokensTipped: post.tokensTipped,
                //messages: LegacyMap::new,
                deleted: post.deleted,
            };
            self.posts.write(index, likedPost);
        }
        fn getPost(self: @ContractState, index: u128) -> Post {
            let _currentPostLength = self.postLength.read();
            assert!(index >= 0, "index is negative");
            assert!(index < _currentPostLength, "index is more than the number of posts");
            let post = self.posts.read(index);
            return post;
        }
        fn getAllPosts(self: @ContractState) -> Array<Post> {
            let _currentPostLength = self.postLength.read();
            let mut index = 0;
            let mut result:Array<Post> = ArrayTrait::new();
            while index != _currentPostLength {
                let post = self.posts.read(index);
                result.append(post);
                index += 1;
            };
            return result;
        }


    }
}