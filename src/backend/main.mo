import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  type Inquiry = {
    schoolName : Text;
    contactPerson : Text;
    email : Text;
    phone : Text;
    preferredDates : Text;
    groupSize : Nat;
    curriculumBoard : Text;
    message : Text;
  };

  let inquiries = List.empty<Inquiry>();

  public shared ({ caller }) func submitInquiry(schoolName : Text, contactPerson : Text, email : Text, phone : Text, preferredDates : Text, groupSize : Nat, curriculumBoard : Text, message : Text) : async () {
    let newInquiry : Inquiry = {
      schoolName;
      contactPerson;
      email;
      phone;
      preferredDates;
      groupSize;
      curriculumBoard;
      message;
    };
    inquiries.add(newInquiry);
  };

  public shared ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };
};
