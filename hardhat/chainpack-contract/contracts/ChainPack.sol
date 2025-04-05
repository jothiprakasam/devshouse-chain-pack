// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChainPack {
    struct Package {
        string name;
        string version;
        string ipfsHash;
        address author;
        uint256 timestamp;
    }

    // Mapping from package name to list of versions
    mapping(string => Package[]) private packageVersions;

    // Events
    event PackagePublished(
        string indexed name,
        string version,
        string ipfsHash,
        address indexed author,
        uint256 timestamp
    );

    // Publish a new package version
    function publishPackage(
        string memory _name,
        string memory _version,
        string memory _ipfsHash
    ) public {
        Package memory newPkg = Package({
            name: _name,
            version: _version,
            ipfsHash: _ipfsHash,
            author: msg.sender,
            timestamp: block.timestamp
        });

        packageVersions[_name].push(newPkg);

        emit PackagePublished(_name, _version, _ipfsHash, msg.sender, block.timestamp);
    }

    // Get a specific version of a package
    function getPackage(
        string memory _name,
        uint256 index
    )
        public
        view
        returns (
            string memory name,
            string memory version,
            string memory ipfsHash,
            address author,
            uint256 timestamp
        )
    {
        require(index < packageVersions[_name].length, "Invalid index");

        Package storage pkg = packageVersions[_name][index];
        return (pkg.name, pkg.version, pkg.ipfsHash, pkg.author, pkg.timestamp);
    }

    // Get the number of versions available for a package
    function getPackageCount(string memory _name) public view returns (uint256) {
        return packageVersions[_name].length;
    }
}
