import { expect } from "chai";
import { Invoice } from "../../src/domain/Invoice";
import { Leader } from "../../src/domain/Leader";

describe("Invoice", () => {
    describe(".isAppInvoice", () => {
        it("returns true when starts with buy_", () => {
            // arrange
            const sut = new Invoice(
                "buy_0000000000000000000000000000000000000000000000000000000000000001_03e9c399722533594be3172968900b78edee2bffecee32c995d19d47c323d05131",
                "821c43d357903adbf257bb883e0441d8c095c0cbc595c6fcccca49f94378c860",
                "9b6332cdaa42d0c26671707f0b2da6422a198ca59866bbfd9517fd58215f1319",
                "1000",
            );

            expect(sut.isAppInvoice).to.equal(true, "should match `buy_{32 hex}_{33 hex}");
        });

        it("should return false when doesn't start with buy_", () => {
            // arrange
            const sut = new Invoice(
                "0000000000000000000000000000000000000000000000000000000000000001_03e9c399722533594be3172968900b78edee2bffecee32c995d19d47c323d05131",
                "821c43d357903adbf257bb883e0441d8c095c0cbc595c6fcccca49f94378c860",
                "9b6332cdaa42d0c26671707f0b2da6422a198ca59866bbfd9517fd58215f1319",
                "1000",
            );

            // act & assert
            expect(sut.isAppInvoice).to.equal(
                false,
                "should be false if it doesn't start with buy",
            );
        });

        it("should return false when doesn't have 32 hex bytes for identity", () => {
            // arrange
            const sut = new Invoice(
                "buy_00_03e9c399722533594be3172968900b78edee2bffecee32c995d19d47c323d05131",
                "821c43d357903adbf257bb883e0441d8c095c0cbc595c6fcccca49f94378c860",
                "9b6332cdaa42d0c26671707f0b2da6422a198ca59866bbfd9517fd58215f1319",
                "1000",
            );

            // act & assert
            expect(sut.isAppInvoice).to.equal(false);
        });

        it("should return false when doesn't have 33 hex bytes for nodeid", () => {
            // arrange
            const sut = new Invoice(
                "buy_0000000000000000000000000000000000000000000000000000000000000001_00",
                "821c43d357903adbf257bb883e0441d8c095c0cbc595c6fcccca49f94378c860",
                "9b6332cdaa42d0c26671707f0b2da6422a198ca59866bbfd9517fd58215f1319",
                "1000",
            );

            // act & assert
            expect(sut.isAppInvoice).to.equal(false);
        });
    });

    describe(".forIdentifier", () => {
        it("returns the identity from the memo", () => {
            // arrange
            const sut = new Invoice(
                "buy_0000000000000000000000000000000000000000000000000000000000000001_03e9c399722533594be3172968900b78edee2bffecee32c995d19d47c323d05131",
                "821c43d357903adbf257bb883e0441d8c095c0cbc595c6fcccca49f94378c860",
                "9b6332cdaa42d0c26671707f0b2da6422a198ca59866bbfd9517fd58215f1319",
                "1000",
            );

            // act & assert
            expect(sut.forIdentifier).to.equal(
                "0000000000000000000000000000000000000000000000000000000000000001",
            );
        });
    });

    describe(".forNodeId", () => {
        it("returns the node identity from the memo", () => {
            // arrange
            const sut = new Invoice(
                "buy_0000000000000000000000000000000000000000000000000000000000000001_03e9c399722533594be3172968900b78edee2bffecee32c995d19d47c323d05131",
                "821c43d357903adbf257bb883e0441d8c095c0cbc595c6fcccca49f94378c860",
                "9b6332cdaa42d0c26671707f0b2da6422a198ca59866bbfd9517fd58215f1319",
                "1000",
            );

            // act & assert
            expect(sut.forNodeId).to.equal(
                "03e9c399722533594be3172968900b78edee2bffecee32c995d19d47c323d05131",
            );
        });
    });

    describe(".settled()", () => {
        it("returns true when invoice settles link", () => {
            // arrange
            const link = new Leader(
                "0000000000000000000000000000000000000000000000000000000000000001",
                "rypj5rexme7cqdqxzok1ygqw89h3m4qsu3dkje1xt894kmwwjr181sz5tnyz6o588bmx384sdx73ojnz3ebrnifxy67ykjfsfctjfns1",
                1000,
            );
            const sut = new Invoice(
                "buy_0000000000000000000000000000000000000000000000000000000000000001_03e9c399722533594be3172968900b78edee2bffecee32c995d19d47c323d05131",
                "821c43d357903adbf257bb883e0441d8c095c0cbc595c6fcccca49f94378c860",
                "9b6332cdaa42d0c26671707f0b2da6422a198ca59866bbfd9517fd58215f1319",
                "1001",
                true,
                1654691544,
            );

            // act & assert
            expect(sut.settles(link)).to.equal(true);
        });

        it("returns false when invoice not settled", () => {
            // arrange
            const link = new Leader(
                "0000000000000000000000000000000000000000000000000000000000000001",
                "rypj5rexme7cqdqxzok1ygqw89h3m4qsu3dkje1xt894kmwwjr181sz5tnyz6o588bmx384sdx73ojnz3ebrnifxy67ykjfsfctjfns1",
                1000,
            );
            const sut = new Invoice(
                "buy_0000000000000000000000000000000000000000000000000000000000000001_03e9c399722533594be3172968900b78edee2bffecee32c995d19d47c323d05131",
                "821c43d357903adbf257bb883e0441d8c095c0cbc595c6fcccca49f94378c860",
                "9b6332cdaa42d0c26671707f0b2da6422a198ca59866bbfd9517fd58215f1319",
                "1001",
            );

            // act & assert
            expect(sut.settles(link)).to.equal(false, "false when invoice is not settled");
        });

        it("returns false when not an app invoice", () => {
            // arrange
            const link = new Leader(
                "0000000000000000000000000000000000000000000000000000000000000001",
                "rypj5rexme7cqdqxzok1ygqw89h3m4qsu3dkje1xt894kmwwjr181sz5tnyz6o588bmx384sdx73ojnz3ebrnifxy67ykjfsfctjfns1",
                1000,
            );
            const sut = new Invoice(
                "some other invoice",
                "821c43d357903adbf257bb883e0441d8c095c0cbc595c6fcccca49f94378c860",
                "9b6332cdaa42d0c26671707f0b2da6422a198ca59866bbfd9517fd58215f1319",
                "1001",
                true,
                1654691544,
            );

            // act & assert
            expect(sut.settles(link)).to.equal(false, "false when random invoice");
        });

        it("returns false identifiers dont match", () => {
            // arrange
            const link = new Leader(
                "0000000000000000000000000000000000000000000000000000000000000001",
                "rypj5rexme7cqdqxzok1ygqw89h3m4qsu3dkje1xt894kmwwjr181sz5tnyz6o588bmx384sdx73ojnz3ebrnifxy67ykjfsfctjfns1",
                1000,
            );
            const sut = new Invoice(
                "buy_821c43d357903adbf257bb883e0441d8c095c0cbc595c6fcccca49f94378c860_039604db5d2e27c061b445ef34d723d9c36a5416dacc4f2e8506f7fe0e76a14f72",
                "67553f5ac05ef188df9b8ebd791ec7cefab8378b4d235bd373be63efeb5da699",
                "96c50b5281d9422dd8345e5dbe879b20fa5eeba530b283095be856ee208991cf",
                "1001",
                true,
                1654691544,
            );

            // act & assert
            expect(sut.settles(link)).to.equal(false, "false when wrong identifier");
        });
    });
});
