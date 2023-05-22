// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.10;

contract Document {
    struct DocumentData {
        string documentHash;
        string studentEmail;
        string issuer;
        string[] signatureEmails;
    }

    mapping(string => DocumentData) documents;

    function issueDocument(
        string memory documentHash,
        string memory studentEmail,
        string memory issuer,
        string[] memory signatureEmails
    ) public {
        documents[documentHash] = DocumentData(
            documentHash,
            studentEmail,
            issuer,
            signatureEmails
        );
    }

    function getDocumentInfo(
        string memory documentHash
    ) public view returns (string memory, string memory, string[] memory) {
        DocumentData storage document = documents[documentHash];
        return (
            document.studentEmail,
            document.issuer,
            document.signatureEmails
        );
    }

    function addIssuerEmail(
        string memory documentHash,
        string memory newEmail
    ) public {
        DocumentData storage document = documents[documentHash];
        document.signatureEmails.push(newEmail);
    }
}
