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
    string[] public documentHashList;

    event DocumentInfo(
        string documentHash,
        string studentEmail,
        string issuer,
        string[] signatureEmails
    );

    function issueDocument(
        string memory documentHash,
        string memory studentEmail,
        string memory issuer,
        string[] memory signatureEmails
    ) external {
        documents[documentHash] = DocumentData(
            documentHash,
            studentEmail,
            issuer,
            signatureEmails
        );

        emit DocumentInfo(documentHash, studentEmail, issuer, signatureEmails);

        documentHashList.push(documentHash);
    }

    //Get the information of a document
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

    //get the array of document hash
    function getDocumentHashList() public view returns (string[] memory) {
        return documentHashList;
    }

    //add issuer email when the document is saved in the blockchain
    function addIssuerEmail(
        string memory documentHash,
        string memory newEmail
    ) public {
        DocumentData storage document = documents[documentHash];
        document.signatureEmails.push(newEmail);
    }
}
