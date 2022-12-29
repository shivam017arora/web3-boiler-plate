const chai = require("chai");
const { expect, assert } = require("chai");
const eventemitter2 = require("chai-eventemitter2");
chai.use(eventemitter2());
const { ethers } = require("hardhat");
const ch = require("@nomicfoundation/hardhat-chai-matchers");

describe("NFT MARKETPLACE ", () => {
  let player1, player2, deployer, blog, blogContract;

  beforeEach(async () => {
    accounts = await ethers.getSigners(); // could also do with getNamedAccounts
    deployer = accounts[0];
    player1 = accounts[1];
    player2 = accounts[2];
    await deployments.fixture(["blog"]); // Deploys modules with the tags given
    blogContract = await ethers.getContract("Blog");
    blog = blogContract.connect(deployer);
  });

  describe("Deploying", function () {
    it("it should deploy successfully", async () => {
      expect(await blog.name()).to.equal("Blog");
    });
  });

  describe("Post", function () {
    it("it should edit the post", async () => {
      await blog.createPost("Title", "Hash");
      await blog.updatePost(1, "Title 2", "Hash", true);

      post = await blog.fetchPosts();
      expect(post[0].title).to.equal("Title 2");
    });
  });
});
