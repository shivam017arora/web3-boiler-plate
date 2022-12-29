// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error OnlyCreatorCanUpdate();

contract Blog is Ownable {
    string public name;

    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
        uint256 id;
        string title;
        string content;
        bool published;
        address creator;
    }

    mapping(uint => Post) private idToPost;
    mapping(string => Post) private hashToPost; //ipfs URI

    event Blog__PostCreated(
        uint id,
        string title,
        string _hash,
        address creator
    );
    event Blog__PostUpdated(
        uint id,
        string title,
        string _hash,
        bool published,
        address creator
    );

    constructor(string memory _name) {
        name = _name;
    }

    function updateName(string memory _name) public {
        name = _name;
    }

    function fetchPost(string memory _hash) public view returns (Post memory) {
        return hashToPost[_hash];
    }

    function createPost(string memory title, string memory _hash) public {
        _postIds.increment();
        uint postId = _postIds.current();
        Post storage post = idToPost[postId];
        post.id = postId;
        post.title = title;
        post.published = true;
        post.content = _hash;
        post.creator = msg.sender;
        hashToPost[_hash] = post;

        emit Blog__PostCreated(postId, title, _hash, msg.sender);
    }

    function updatePost(
        uint postId,
        string memory title,
        string memory _hash,
        bool published
    ) public {
        if (msg.sender != idToPost[postId].creator) {
            revert OnlyCreatorCanUpdate();
        }
        Post storage post = idToPost[postId];
        post.title = title;
        post.published = published;
        post.content = _hash;
        idToPost[postId] = post;
        hashToPost[_hash] = post;

        emit Blog__PostUpdated(post.id, title, _hash, published, msg.sender);
    }

    function fetchPosts() public view returns (Post[] memory) {
        uint itemCount = _postIds.current();

        Post[] memory posts = new Post[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Post storage currentItem = idToPost[currentId];
            posts[i] = currentItem;
        }

        return posts;
    }
}
